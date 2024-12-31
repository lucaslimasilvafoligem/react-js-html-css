import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Item({ titulo, subtitulo, olink }) {

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    console.log("Montado ou atualizado");
  })

  return (
    <Card sx={{ minWidth: 275, margin:"2em" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          Word in 2077
        </Typography>
        <Typography variant="h5" component="div">
          {titulo}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {subtitulo}
        </Typography>
        <Typography variant="body2">
          Cyberpiscose
          <br />
          {'"Arasaka, Militec e Kang-Tal"'}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={olink} target="_blank" rel="noopener noreferrer">
          <Button size="small">Trailer</Button>
        </a>
      </CardActions>
      <button onClick={()=>setCount(count+1)}>Like</button>
      {count}
    </Card>
  );
}
