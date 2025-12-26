import { useEffect, useEffectEvent, useState } from "react";

export default function Logo() {
  const [logoUrl, setLogoUrl] = useState(null);
  const onLoadLogo = useEffectEvent(() => {
    const link = document.querySelector("link[rel='icon']");
    setLogoUrl(link.href);
  });
  useEffect(() => {
    onLoadLogo();
  }, []);
  return (
    <header className="flex h-7 items-center gap-3 text-2xl leading-[100%] font-bold lg:h-12 lg:text-4xl">
      <img className="h-full" src={logoUrl} alt="Taslema website Logo" />
      <b className="decoration-primary-500 text-slate-800 decoration-4 underline-offset-6">
        Tasleem
      </b>
      <b className="text-primary-600">ة</b>
    </header>
  );
}
