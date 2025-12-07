import type { ReactNode } from 'react';
import type { LimitIcon } from '../type';
import { ShoppingIcon } from '@shared/ui/icons';

export const limitIcons: Record<LimitIcon, ReactNode> = {
    pet: <ShoppingIcon />,
    shopping: <ShoppingIcon />,
    ring: <ShoppingIcon />,
    beer: <ShoppingIcon />,
    sport: <ShoppingIcon />,
    education: <ShoppingIcon />,
    route: <ShoppingIcon />,
    goverment: <ShoppingIcon />,
    car: <ShoppingIcon />,
    device: <ShoppingIcon />,
    wifi: <ShoppingIcon />,
};
