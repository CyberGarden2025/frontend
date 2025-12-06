import { type FC } from 'react';
import clsx from 'clsx';
import styles from './MessageButtons.module.scss';

export interface MessageButton {
    id: string;
    label: string;
    action?: string;
}

export interface MessageButtonsProps {
    buttons: MessageButton[];
    onButtonClick: (button: MessageButton) => void;
    className?: string;
    style?: React.CSSProperties;
}

export const MessageButtons: FC<MessageButtonsProps> = ({
    buttons,
    onButtonClick,
    className,
    style,
}) => {
    if (buttons.length === 0) {
        return null;
    }

    return (
        <div className={clsx(styles.root, className)} style={style}>
            {buttons.map((button) => (
                <button
                    key={button.id}
                    className={styles.button}
                    onClick={() => onButtonClick(button)}
                    type="button"
                >
                    {button.label}
                </button>
            ))}
        </div>
    );
};

