import { Fragment } from 'react';
import { PublicationView } from '../../utils/publications';
import { skeleton } from '../../utils';

const PublicationCard = ({
  publications,
  loading,
  scholarUrl,
}: {
  publications: PublicationView[];
  loading: boolean;
  scholarUrl?: string;
}) => {
  const renderSkeleton = () => {
    const array = [];
    for (let index = 0; index < publications.length; index++) {
      array.push(
        <div className="card shadow-lg compact bg-base-100" key={index}>
          <div className="p-8 h-full w-full">
            <div className="flex items-center flex-col">
              <div className="w-full">
                <div className="px-4">
                  <div className="text-center w-full">
                    <h3 className="mb-2">
                      {skeleton({
                        widthCls: 'w-32',
                        heightCls: 'h-8',
                        className: 'mb-2 mx-auto',
                      })}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>,
      );
    }

    return array;
  };

  const renderPublications = () => {
    return publications.map((item) => {
      const body = (
        <div className="p-8 h-full w-full">
          <div className="flex items-center flex-col">
            <div className="w-full">
              <div className="px-4">
                <div className="text-center w-full">
                  {item.badges.length > 0 && (
                    <div className="mb-2 flex flex-wrap justify-center gap-2">
                      {item.badges.map((badge) => (
                        <span
                          key={badge}
                          className="badge badge-outline badge-sm"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                  <h3 className="font-medium opacity-60 mb-2">{item.title}</h3>
                  {(item.venue || item.year) && (
                    <p className="text-base-content opacity-50 text-sm">
                      {[item.venue, item.year].filter(Boolean).join(' ')}
                    </p>
                  )}
                  {item.authors && (
                    <p className="text-base-content opacity-50 text-sm">
                      Authors: {item.authors}
                    </p>
                  )}
                  {typeof item.citationCount === 'number' &&
                    item.citationCount > 0 && (
                      <p className="text-base-content opacity-50 text-sm">
                        {item.citationCount === 1
                          ? '1 citation'
                          : `${item.citationCount} citations`}
                      </p>
                    )}
                  {item.description && (
                    <p className="mt-2 text-base-content text-opacity-60 text-sm text-justify">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      if (!item.link) {
        return (
          <div className="card shadow-lg compact bg-base-100" key={item.id}>
            {body}
          </div>
        );
      }

      return (
        <a
          className="card shadow-lg compact bg-base-100 cursor-pointer"
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noreferrer"
        >
          {body}
        </a>
      );
    });
  };

  return (
    <Fragment>
      <div id="publications" className="col-span-1 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2">
            <div className="card compact bg-base-100 shadow bg-opacity-40">
              <div className="card-body">
                <div className="mx-3 flex items-center justify-between mb-2">
                  <h2 className="card-title">
                    {loading ? (
                      skeleton({ widthCls: 'w-40', heightCls: 'h-8' })
                    ) : (
                      <span className="text-base-content opacity-70">
                        Publications
                      </span>
                    )}
                  </h2>
                  {!loading && scholarUrl && (
                    <a
                      href={scholarUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="link text-sm"
                    >
                      Google Scholar
                    </a>
                  )}
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? renderSkeleton() : renderPublications()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PublicationCard;
