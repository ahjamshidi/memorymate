'use client';
import Flipcard from '@/components/flipcard/flipcard';
import { getTopicsById } from '@/services/topic';
import * as React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { ChipData } from '@/constances/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
export default function Flashcard({ params }: { params: { id: number } }) {
  const [cardList, setCardList] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [showAnswerFlag, setShowAnswerFlag] = React.useState(false);
  let tmpCards = [];
  const showAnswer = () => {
    setShowAnswerFlag(!showAnswerFlag);
  };

  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: 'Again', subLable: '<1m', color: 'error' },
    { key: 1, label: 'Hard', subLable: '<10m', color: 'warning' },
    { key: 2, label: 'Good', subLable: '<1d', color: 'info' },
    { key: 3, label: 'Easy', subLable: '<4d', color: 'success' },
  ]);

  React.useEffect(() => {
    getTopicsById(params.id).then((cards) => {
      setCardList(cards);
      setCurrentCard(getNextcard(cards.data));
      setLoading(true);
    });
  }, []);
  const getNextcard = (data: any) => {
    if (data.review.length) {
      return data.review.pop();
    } else if (data.new.length) {
      return data.new.pop();
    } else {
      return false;
    }
  };
  const setHardnessLevel = () => {
    console.log(currentCard);
    setShowAnswerFlag(!showAnswerFlag);
    setTimeout(() => {
      setCurrentCard(getNextcard(cardList.data));
    }, 1000);
  };
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));
  return (
    <div style={{ textAlign: 'center' }}>
      {loading ? (
        <>
          <Flipcard
            front={currentCard.front}
            back={currentCard.back}
            backShow={showAnswerFlag}
            image={`https://picsum.photos/id/${currentCard.id}/300/300`}
          ></Flipcard>
          <Paper
            className={showAnswerFlag ? 'show-flex' : 'hide'}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              transition: 'ease-in-out',
              flexWrap: 'wrap',
              listStyle: 'none',
              p: 0.5,
              m: 0,
            }}
            component="ul"
          >
            {chipData.map((data) => {
              return (
                <ListItem key={data.key}>
                  <p style={{ margin: 0, color: 'text.secondary' }}>
                    {data.subLable}
                  </p>
                  <Chip
                    label={data.label}
                    color={data.color}
                    onClick={setHardnessLevel}
                  />
                </ListItem>
              );
            })}
          </Paper>
          <Button
            onClick={showAnswer}
            variant="contained"
            className={showAnswerFlag ? 'hide' : 'show-iblock'}
          >
            Show answer
          </Button>
        </>
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
    </div>
  );
}
