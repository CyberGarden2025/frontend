import type { FC } from "react";
import type { LimitCardProps } from "./LimitCard.props";
import cls from "./LimitCard.module.scss"
import { categoryIconMapping } from "@entities/expense";
import { SettingsIcon } from "@shared/ui/icons";
import { LimitBarWidget } from "@widgets";


export const LimitCard: FC<LimitCardProps> = ({category, expense, name,  income, color}) => {
    return (
        <div className={cls.wrapper}>
            <div className={cls.row}>
                <div className={cls.icon}>
                    {categoryIconMapping[category]}
                </div>
                <h3 className={cls.title}>
                    {name}
                </h3>
                <div className={cls.icon}>
                    <SettingsIcon/>
                </div>
            </div>
            <LimitBarWidget income={income} expense={expense} color={color}/>
        </div>
    );
};