import { useState, useEffect, useRef, useCallback } from 'react';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

import Product from '~/components/Product';
import { AppBar, Container, Toolbar } from '@mui/material';
import { getMockData, MockData } from '~/utils/data';
import LoadingSpinner from '~/common/LoadingSpinner';

const InfiniteScroll = () => {
    const [items, setItems] = useState<MockData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const loadMoreData = async () => {
        const { datas, isEnd } = await getMockData(page);
        setItems((prevItems) => [...prevItems, ...datas]);
        setHasMore(!isEnd);
    };

    useEffect(() => {
        loadMoreData();
    }, [page]);

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observerRef.current.observe(node);
        },
        [hasMore],
    );

    const totalPrice = items.reduce((acc, cur) => acc + cur.price, 0);

    return (
        <Container sx={{ marginTop: 12 }}>
            <AppBar position="fixed" sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#D3EE98' }}>
                <Toolbar>
                    <Typography
                        sx={{
                            fontFamily: 'Gowun Batang',
                            fontSize: 22,
                            padding: 2,
                            color: '#000000',
                        }}
                    >
                        상품리스트의 총 가격: {new Intl.NumberFormat().format(totalPrice)}$
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {items.map((item: MockData, idx) => (
                    <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4 }} key={idx}>
                        <Product key={item.productId} product={item} />
                    </Grid>
                ))}

                {hasMore && <LoadingSpinner />}

                <div ref={lastElementRef} style={{ height: '20px', background: 'transparent' }} />
            </Grid>
        </Container>
    );
};

export default InfiniteScroll;
