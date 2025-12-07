import { type FC } from 'react';

export interface QuestionIconProps {
    className?: string;
    style?: React.CSSProperties;
}

export const QuestionIcon: FC<QuestionIconProps> = ({ className, style }) => {
    return (
        <svg
            className={className}
            style={style}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 11.3333H8.00667"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6.06001 6.00001C6.21679 5.55446 6.52616 5.17875 6.93331 4.93943C7.34046 4.70012 7.81927 4.61264 8.28481 4.69248C8.75035 4.77233 9.17254 5.01436 9.47673 5.37569C9.78091 5.73702 9.94737 6.19436 9.94668 6.66668C9.94668 8.00001 7.94668 8.66668 7.94668 8.66668"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

