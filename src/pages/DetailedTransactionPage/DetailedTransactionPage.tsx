import { IconButton } from '@shared/ui';
import cls from './DetailedTransactionPage.module.scss';
import { ArrowBackIcon } from '@shared/ui/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDateToRu } from '@shared/lib';
import { ExpenseDetailed } from '@entities/expense';
import { useLazyGetOperationQuery } from '@entities/expense/api';
import { useEffect } from 'react';

export const DetailedTransactionPage = () => {
    const { id } = useParams<{ id: string }>();
    const [trigger, { data }] = useLazyGetOperationQuery();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            trigger({ id: +id });
        }
    }, [id, trigger]);

    return (
        <div className={cls.root}>
            <div className={cls.container}>
                <div className={cls.header}>
                    <div className={cls.headerTop}>
                        <IconButton
                            icon={<ArrowBackIcon />}
                            variant="primary"
                            state="default"
                            size="large"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    {data && (
                        <h1 className={cls.title}>
                            {formatDateToRu(data.transactionDate.toString())}
                        </h1>
                    )}
                </div>
                {data && id && <ExpenseDetailed transaction={data} transactionId={+id} onDelete={() => navigate('/operations')} />}
            </div>
        </div>
    );
};
