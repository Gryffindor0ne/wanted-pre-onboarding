import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { formattedDate } from '~/utils/utils';
import { MockData } from '~/utils/data';

const Product = ({ product }: { product: MockData }) => {
    return (
        <Box
            sx={{
                paddingTop: 2,
                background: '#72BF78',
                borderRadius: 4,
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Gowun Batang',
                    fontSize: 22,
                    padding: 2,
                }}
            >
                {product.productName}
            </Typography>
            <Typography sx={{ fontFamily: 'Gowun Batang', fontSize: 20, padding: 1 }}>{`${product.price}$`}</Typography>
            <Typography
                sx={{ fontFamily: 'Gowun Batang', fontSize: 16, padding: 2.5 }}
            >{`구매일자: ${formattedDate(product.boughtDate)}`}</Typography>
        </Box>
    );
};
export default Product;
