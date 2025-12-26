import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function cloneAsA4(node: Node) {
  const clone = node.cloneNode(true) as HTMLElement;

  clone.style.width = "1240px";
  clone.style.borderRadius = "0";
  clone.style.position = "fixed";
  clone.style.left = "-99999px";
  clone.style.top = "0";

  document.body.appendChild(clone);
  return clone;
}

function download(url: string, name: string) {
  const link = document.createElement("a");

  link.href = url;
  link.download = name;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(url);
  link.remove();
}

class DocumentExporter {
  strategy?: IExporter;
  node?: Node;
  setStrategy(strategy: IExporter) {
    this.strategy = strategy;

    return this;
  }
  setNode(node: Node) {
    this.node = node;
    return this;
  }
  export(name: string) {
    if (!this.strategy) throw "error undefined export strategy";
    if (!this.node) throw "error undefined node ";
    this.strategy.setNode(this.node);
    this.strategy.export(name);
    return this;
  }
}

interface IExporter {
  node?: Node;
  export(name: string): any;
  setNode(node: Node): IExporter;
}

class ImageExporter implements IExporter {
  node?: HTMLElement;

  setNode(node: HTMLElement) {
    this.node = node;
    return this;
  }
  export(name: string) {
    console.log("exporting image");
    if (!this.node) throw "error";

    const clone = cloneAsA4(this.node);

    const canvas = html2canvas(clone, {
      scale: 2,
      backgroundColor: "#fff",
    });
    canvas
      .then((c) => c.toDataURL("image/png"))
      .then((url) => download(url, name + ".png"))
      .then(() => clone.remove());
  }
}
class PdfExporter implements IExporter {
  node?: Node;
  setNode(node: Node) {
    this.node = node;
    return this;
  }
  export(name: string) {
    console.log("exporting pdf using canvas and library");
    // A4 in mm
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    // px based on 96dpi
    const PX_PER_MM = 150 / 25.4;
    const WIDTH_PX = A4_WIDTH * PX_PER_MM;
    const HEIGHT_PX = A4_HEIGHT * PX_PER_MM;

    // clone node
    const clone = this.node?.cloneNode(true) as HTMLElement;

    clone.style.width = WIDTH_PX + "px";
    clone.style.minHeight = HEIGHT_PX + "px";
    clone.style.borderRadius = "0";
    clone.style.boxShadow = "";
    clone.style.background = "white";

    // hidden container
    const wrapper = document.createElement("div");
    wrapper.style.position = "fixed";
    wrapper.style.left = "-100000px";
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // render
    html2canvas(clone, {
      scale: 2,
      backgroundColor: "#fff",
      useCORS: true,
    })
      .then((data) => data.toDataURL("image/jpeg", 1.0))
      .then((imageUrl) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imageUrl, "JPEG", 0, 0, A4_WIDTH, A4_HEIGHT);
        pdf.save(name + ".pdf");
      })
      .then(() => document.body.removeChild(wrapper));
  }
}

class PdfByBrowserExporter implements IExporter {
  node?: HTMLElement;
  constructor() {}
  setNode(node: HTMLElement) {
    this.node = node;
    return this;
  }
  export(name: string) {
    console.log("exporting pdf using browser ");
    const printWindow = window.open("", "_blank", "width=900,height=650");

    const styles = [...document.styleSheets]
      .map((s) => {
        try {
          return [...s.cssRules].map((r) => r.cssText).join("");
        } catch {
          return "";
        }
      })
      .join("");

    printWindow?.document.write(`
    <html>
      <head>
        <title>printing ${name}</title>
        <style>
          ${styles}

          @page {
            size: A4;
          }

          body {
            background: white;
          }

          .print-root {
            width: 210mm;
            min-height: 297mm;
          }
        </style>
      </head>
      <body>
        <div class="print-root">
          ${this.node?.outerHTML}
        </div>

        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
            window.oncloseprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);

    printWindow?.document.close();
  }
}

export { ImageExporter, PdfExporter, PdfByBrowserExporter };
export default DocumentExporter;
