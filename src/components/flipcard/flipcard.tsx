import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './falshcard.css';
export default function Flipcard({
  front,
  back,
  backShow,
  image = '',
}: {
  front: string;
  back: string;
  backShow: boolean;
  image?: string;
}) {
  return (
    <>
      <div className={backShow? 'flip-container hover':"flip-container"} >
        <div className="flipper">
          <div className="front">
            <Card sx={{ height: '100%' }} className='card-wrap'>
              <CardContent>{front}</CardContent>
            </Card>
          </div>
          <div className="back">
            <Card sx={{ height: '100%',backgroundColor:'info.main' }} className='card-wrap'>
              <CardContent>{back}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
