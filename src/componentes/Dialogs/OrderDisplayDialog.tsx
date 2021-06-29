import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

interface Props {
    open: boolean,
    orderID: string;
}

export const OrderDisplayDialog:React.FC<Props> = ({open, orderID}) => {
    const [openDisplayDialog, setDisplayDialog] = useState(true);

    return( 
        <Dialog open={open} onClose={() => setDisplayDialog(false)} aria-labelledby="form-dialog-title" maxWidth='md'>
            
        </Dialog>
        )
}