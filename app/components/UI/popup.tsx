import styles from "@/app/styles/components/UI/popup.module.css";
import Icon from "../icons/icon";
import Cross from "../icons/outline/cross";

const Popup = ({
  children,
  title,
  type = "default",
  setMenu,
  buttonName = "Close",
  then = () => {},
  cross = false,
}: {
  children: React.ReactNode;
  title: string;
  type?: "default" | "error" | "success";
  setMenu: (menu: null | React.ReactNode) => void;
  buttonName?: string;
  then?: () => void;
  cross?: boolean;
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className={[styles.container, styles[type]].join(" ")}>
          {cross && (
            <div className={styles.cross} onClick={() => setMenu(null)}>
              <Icon>
                <Cross />
              </Icon>
            </div>
          )}
          <h1
            className={[styles.title, styles[type], "flex items-center"].join(
              " "
            )}
          >
            {type === "error" && (
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-9 h-9 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                />
              </svg>
            )}
            {title}
          </h1>
          <div className={styles.content}>{children}</div>
          <button
            className={[styles.button, styles[type]].join(" ")}
            onClick={() => {
              setMenu(null);
              then();
            }}
          >
            {buttonName}
          </button>
        </div>
      </div>
    </>
  );
};

export default Popup;
