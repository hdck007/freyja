import Link from "next/link";
import Layout from "../components/Layout";

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-[450px] border container">
        <div className="big-box">{" "}</div>
        <div className="circle"></div>
        <div className="med-box"></div>
        <div className="small-box"></div>
        <div className="sqaure">{""}</div>
        <div className="small-sqaure"></div>
        <div className="hero">
          <span>30</span><br/>
          HOURS OF...
        </div>
        <div className="line1">DESIGNING / BUILDING / CODING / HACKING</div>
        <div className="line2">
          NETWORKING / FRIENDS / MENTORS / COMPETITIONS
        </div>
        <div className="line3">
          COFFEE / TEA / GREEN TEA / FOOD / SNAKS / SWAGS / T-SHIRTS
        </div>
        <div className="line4">
          SUPER FAST INTERNET / TALKS / DID WE MENTION GREEN TEA? / PRIZES /
          BRAND NEW APIS
        </div>
        <div className="line5">
          AND / A / WHOLE / LOT / MORE <div className="placeholder">{""}</div>
        </div>
      </div>
    </div>
  </Layout>
);

export default AboutPage;
