import { FiSun, FiMoon } from 'react-icons/fi';
import { LOCAL_STORAGE_KEY_NAME } from '../../constants';

const ThemeChanger = ({
  theme,
  setTheme,
}: {
  theme: string;
  setTheme: (theme: string) => void;
}) => {
  const isNight = theme === 'night';
  const label = `Switch to ${isNight ? 'day' : 'night'} theme`;
  return (
    <button
      type="button"
      className="btn btn-circle btn-ghost"
      aria-label={label}
      title={label}
      onClick={() => {
        const nextTheme = isNight ? 'nord' : 'night';
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY_NAME, nextTheme);
        } catch {
          /* Theme still works when storage is unavailable. */
        }
        setTheme(nextTheme);
      }}
    >
      {isNight ? (
        <FiSun aria-hidden="true" className="w-6 h-6" />
      ) : (
        <FiMoon aria-hidden="true" className="w-6 h-6" />
      )}
    </button>
  );
};
export default ThemeChanger;
