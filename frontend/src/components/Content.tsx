import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { IconButton, Paper } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useEffect, useState } from 'react'
import { Flyer, call } from '../api/services/Flyer'

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const transformUppercase = (value: string) => value.toUpperCase()

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export default function Content () {
  const [error, setError] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState<Array<Flyer>>([])
  const [previousPage, setPreviousPage] = useState(null)
  const [nextPage, setNextPage] = useState(null)

  // Nota: l'array deps vuoto [] significa
  // questo useEffect verrà eseguito una volta
  // simile a componentDidMount()
  useEffect(() => {
    call()
      .then(res => {
        setIsLoaded(true)
        setItems(res.data)
        if (res.previous) setPreviousPage(res.previous)
        if (res.next) setNextPage(res.next)
      })
      .catch(err => {
        setIsLoaded(true)
        setError(err)
      })
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <Container disableGutters maxWidth={false}>
        {/* End hero unit */}
        <Grid container spacing={4}>
          {items.map(item => (
            <Grid item key={item.id} xs={6} sm={4} md={2}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    position: 'relative',
                    height: '200px',
                    width: '200px'
                  }}
                >
                  <CardMedia
                    image={'https://picsum.photos/seed/' + item.id + '/200/200'}
                    sx={{
                      filter: 'blur(20px)',
                      height: '100%',
                      width: '100%'
                    }}
                  ></CardMedia>
                  <CardMedia
                    component='img'
                    image={
                      'https://picsum.photos/seed/' +
                      item.id +
                      '/200/' +
                      getRandomInt(150, 200)
                    }
                    sx={{
                      objectFit: 'cover',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      display: 'block',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                    alt='random'
                  />
                </Paper>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant='subtitle1'>
                    {transformUppercase(item.retailer)}
                  </Typography>
                  <Typography gutterBottom variant='h6'>
                    {item.title}
                  </Typography>
                  <Typography variant='caption'>{item.category}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton>
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    )
  }
}
