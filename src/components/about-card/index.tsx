import { skeleton } from '../../utils';

const AboutCard = ({ about, loading }: { about: string; loading: boolean }) => {
  return (
    <div id="about" className="card shadow-lg compact bg-base-100">
      <div className="card-body">
        <div className="mx-3">
          <h2 className="card-title">
            {loading ? (
              skeleton({ widthCls: 'w-32', heightCls: 'h-8' })
            ) : (
              <span className="text-base-content opacity-70">About</span>
            )}
          </h2>
          <div className="mt-3 text-base-content text-opacity-60 text-sm text-justify">
            {loading ? (
              skeleton({ widthCls: 'w-full', heightCls: 'h-20' })
            ) : (
              <p>{about}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
