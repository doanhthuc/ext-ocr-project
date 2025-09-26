import BG_AUTH from '~/assets/images/bg-auth.png';
import DASHBOARD from '~/assets/images/dashboard.png';

export function DashboardIllustration() {
  return (
    <div
      className="bg-cover flex flex-col items-center justify-center text-gray-4"
      style={{ background: `url(${BG_AUTH})` }}
    >
      <h1 className="font-semibold text-5xl">Welcome to Atlas</h1>
      <div className="mb-11.5 text-2xl text-center">
        Connect with Google for a seamless, personalized experience.
      </div>
      <img className="w-[calc(100%-120px)]" src={DASHBOARD} />
    </div>
  );
}
