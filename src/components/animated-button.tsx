import { useState, useEffect, type RefObject, useMemo } from "react";
import { v4 as uuid } from "uuid";

import { useMouse } from "@uidotdev/usehooks";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

const gradientBorder =
  "after:opacity-0 after:absolute after:z-[-1] after:left-[-2px] after:block after:h-[calc(100%+4px)] after:w-[calc(100%+4px)] after:rounded-full after:transition-opacity after:duration-150";

const gradientShadow =
  "before:opacity-0 before:absolute before:z-[-1] before:left-[-2px] before:block before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:rounded-full before:transition-opacity before:blur-lg";

const animationActive = "before:opacity-[1] after:opacity-[1] after:animate-spin before:animate-spin";

function animationTimer(cb: () => void, ms: number) {
  setTimeout(() => {
    cb();
  }, ms);
}

const Button = ({ children, href, onClick }: Props) => {
  // const [id, setId] = useState<string>("");
  const [showAnimation, setShowAnimation] = useState(true);
  const id = "abc";

  useEffect(() => {
    animationTimer(() => setShowAnimation(false), 2000);
  }, []);

  const [mouse, ref] = useMouse();

  const xIntersecting = useMemo(() => mouse.elementX > 0 && mouse.elementX < ref.current.clientWidth, [mouse.elementX]);
  const yIntersecting = useMemo(
    () => mouse.elementY > 0 && mouse.elementY < ref.current.clientHeight,
    [mouse.elementY],
  );
  const isIntersecting = xIntersecting && yIntersecting;

  // const Component = href ? Link : "button";

  const deg = isIntersecting
    ? Math.atan2(mouse.elementY - ref.current.clientHeight / 2, mouse.elementX - ref.current.clientWidth / 2) *
      (180 / Math.PI)
    : 0;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .animated-button::after, .animated-button::before {
            background: linear-gradient(${deg + 70}deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
          }
        `,
        }}
      />
      <a
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref as RefObject<HTMLButtonElement | HTMLAnchorElement>}
        href={href || ""}
        onClick={onClick}
        className={`animated-button font-logo shadow-[0_0_0_1px] shadow-white/20 hover:shadow-none transition-shadow w-4 h-4 justify-center flex-grow-0 flex-shrink-0 relative inline-flex items-center rounded-full bg-[rgba(0,0,0,0.8)] text-inherit shadow-btn ${showAnimation ? animationActive : ""} hover:before:opacity-[1] hover:after:opacity-[1] ${gradientBorder} ${gradientShadow}`}
      >
        {children}
      </a>
    </>
  );
};

export default Button;
