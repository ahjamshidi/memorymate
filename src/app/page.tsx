'use client';
import { getTopics } from '@/services/topic';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatRelative } from 'date-fns';
import { Topic } from '@/constances/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Main() {
  const [topicList, setTopicList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getTopics().then((topics) => {
      setTopicList(topics.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
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
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 150 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Last Review</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topicList.map((topic: Topic) => (
                <TableRow
                  key={topic.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link href={'/flashcard/' + topic.id}>{topic.title}</Link>
                  </TableCell>
                  <TableCell align="right">
                    {topic.updatedAt?(formatRelative(topic.updatedAt, new Date())):'NEW'
                    }
                  </TableCell>
                  <TableCell align="right">...</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
