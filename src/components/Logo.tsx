import logoImg from "@/assets/nextcar_logo.png"

export function Logo() {
  return (
    <img
      src={logoImg}
      alt="NEXTCAR"
      className="pointer-events-none h-[40px] w-auto select-none object-contain sm:h-[48px] md:h-[55px]"
    />
  )
}
