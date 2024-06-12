'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { getTopicsById } from '@/services/topic';
import { usePathname, useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { formatDistance, subDays } from 'date-fns';
export default function FlashcardOverview({
  params,
}: {
  params: { id: number };
}) {
  const [topicList, setCardList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    getTopicsById(params.id).then((cards) => {
      setCardList(cards);
      setLoading(true);
    });
  }, []);
  return (
    <Grid
      container
      spacing={1}
      sx={{ height: '100%', alignItems: 'center', textAlign: 'center' }}
    >
      {loading ? (
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              transition: 'ease-in-out',
              flexWrap: 'wrap',
              listStyle: 'none',
              px: 2.5,
              m: 0,
            }}
          >
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              New:
              <Box sx={{ color: 'success.main' }} component="span">
                {' ' + topicList?.data?.new.length}
              </Box>
            </Typography>
            <Typography component="span" sx={{ fontWeight: 'bold' }}>
              Review:
              <Box sx={{ color: 'error.main' }} component="span">
                {' ' + topicList?.data?.review.length}
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{ fontSize: '12px', textAlign: 'left', px: 2.5 }}
            component="div"
          >
            last time study:
            {topicList?.data?.lastReview
              ? formatDistance(
                  subDays(new Date(topicList?.data?.lastReview), 3),
                  new Date(),
                  { addSuffix: true }
                )
              : 'First Time Study'}
          </Box>

          <Link href={'/flashcard/' + params.id + '/study'}>
            <Button
              sx={{ width: 'calc(100% - 40px)', mt: 2 }}
              variant="contained"
            >
              Study
            </Button>
          </Link>
        </Grid>
      ) : (
        <Box
          sx={{
            position: 'fixed',
            margin: 'auto',
            right: 'calc(50% - 20px)',
            top: 'calc(50% - 20px)',
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Grid>
  );
}
