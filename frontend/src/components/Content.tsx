import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const transformUppercase = (value: string) => value.toUpperCase()

export default function Content () {
  return (
    <Container disableGutters maxWidth={false}>
      {/* End hero unit */}
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={6} sm={4} md={2}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component='img'
                image='https://source.unsplash.com/random'
                sx={{ height: '10rem', width: 'auto' }}
                alt='random'
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='subtitle1'>
                  {transformUppercase('Retailer name')}
                </Typography>
                <Typography gutterBottom variant='h6'>
                  Flyer title
                </Typography>
                <Typography variant='caption'>
                  Category name
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton><FavoriteBorderIcon /></IconButton>
                <IconButton><FavoriteIcon /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
