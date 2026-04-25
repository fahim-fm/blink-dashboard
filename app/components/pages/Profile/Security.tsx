import { LoginHistory } from './LoginHistory';
import { Auth } from './Auth';

function Security() {
  return (
    <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[10px]">
      <div className="w-full lg:w-1/2">
        <LoginHistory />
      </div>
      <div className="w-full lg:w-1/2">
        <Auth />
      </div>
    </div>
  );
}

export default Security;