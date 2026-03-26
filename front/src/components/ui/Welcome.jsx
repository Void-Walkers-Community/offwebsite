import { useRef, useLayoutEffect } from "react"
import { gsap } from "gsap"

const Welcome = () => {
  const sectionRef = useRef(null)
  const subtitleRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const btnRef = useRef(null)


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8
        }
      })

      tl.from(subtitleRef.current, {
        y: 24,
        opacity: 0
      })
        .from(titleRef.current, {
          y: 28,
          opacity: 0
        }, "-=0.45")
        .from(descRef.current, {
          y: 18,
          opacity: 0
        }, "-=0.45")

        // macOS-like button reveal
        .from(btnRef.current, {
          y: 20,
          opacity: 0,
          scale: 0.96,
          duration: 0.7,
          ease: "power3.out"
        }, "-=0.35")

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="welcome"
      className="text-center flex flex-col gap-3 will-change-transform"
    >
      <p
        ref={subtitleRef}
        className="font-bold font-JfSb text-[30px] leading-none"
      >
        Learn. Build. Conquer.
      </p>

      <h1
        ref={titleRef}
        className="font-semibold font-Outfit text-[40px] leading-none"
      >
        A Hub for minds that Creates.
      </h1>

      <h2
        ref={descRef}
        className="text-[#A0A0A0]"
      >
        Level up your tech mastery within a family built for collective growth and elite competition.
      </h2>

      <a
        href="https://discord.gg/TZ58u3XHyn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          ref={btnRef}
          className="mx-auto cursor-pointer flex w-[151px] h-[82px] items-center justify-center text-center gap-2.5 px-[5px] py-[26px] relative transition-transform duration-200 hover:scale-[1.03]"
        >

          <div className="absolute top-0 -left-1.5 w-[162px] h-[82px] z-0">

            <div className="absolute top-0 left-[39px] w-[84px] h-[82px] bg-[#f74e83] rounded-[42px/41px] blur-[50px]" />

            <div className="absolute top-[17px] left-0 w-[162px] h-[50px] bg-[#000000e6] rounded-[15px] border-2 border-solid border-[#ffffff1a] shadow-[0px_18px_28px_#000000cc] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]" />

            <div className="absolute top-[38px] left-3 w-[138px] h-[7px] bg-[#d9d9d980] rounded-[69px/3.5px] blur-[10px]" />

          </div>

          <div className="relative z-10 w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(90,90,90,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-semibold text-[15px] text-center tracking-[0] leading-[normal]">
            Enter the void
          </div>

        </div>
      </a>
    </section>
  )
}

export default Welcome