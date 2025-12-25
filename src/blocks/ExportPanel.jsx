import Button from "@blocks/Button.jsx";
import PdfIcon from "@blocks/PdfIcon";
import { Chromium, Image, ExternalLink } from "lucide-react";

import DocExporter from "@utils/DocumentExporter";
import {
  ImageExporter,
  PdfExporter,
  PdfByBrowserExporter,
} from "@utils/DocumentExporter";

export default function ExportPanel({ docRef, className }) {
  const handelExport = (s) => {
    new DocExporter().setStrategy(s).setNode(docRef.current).export("filename");
  };
  return (
    <div
      className={
        "flex flex-wrap items-start justify-between gap-3 " + className
      }
    >
      <Button
        onClick={() => handelExport(new ImageExporter())}
        icon={<Image size={24} />}
      >
        حمل ك
      </Button>
      <Button
        onClick={() => handelExport(new PdfExporter())}
        icon={<PdfIcon />}
      >
        حمل ك
      </Button>
      <Button
        onClick={() => handelExport(new PdfByBrowserExporter())}
        icon={<Chromium size={24} />}
      >
        اطبع
      </Button>
    </div>
  );
}
