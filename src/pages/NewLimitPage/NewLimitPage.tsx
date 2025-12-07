import { IconButton } from '@shared/ui';
import { ArrowBackIcon } from '@shared/ui/icons';
import cls from './NewLimitPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { NewLimitForm } from '@entities/limit';

export const NewLimitPage = () => {
    const navigate = useNavigate();

    return (
        <div className={cls.root}>
            <div className={cls.container}>
                <div className={cls.header}>
                    <div className={cls.header}>
                        <div className={cls.headerTop}>
                            <IconButton
                                icon={<ArrowBackIcon />}
                                variant="primary"
                                state="default"
                                size="large"
                                onClick={() => navigate(-1)}
                            />
                            <h1 className={cls.title}>Новый лимит</h1>
                        </div>
                    </div>
                </div>
                <NewLimitForm />
            </div>
        </div>
    );
};
