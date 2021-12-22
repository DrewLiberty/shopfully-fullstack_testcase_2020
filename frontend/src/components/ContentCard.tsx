import { IconButton, Paper } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import {
  get as getFavorite,
  add as addFavorite,
  remove as removeFavorite
} from '../api/services/Favorites'
import { useState } from 'react'

const transformUppercase = (value: string) => value.toUpperCase()

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

export default function ContentCard ({
  identifier,
  retailer,
  title,
  category
}: {
  identifier: number
  retailer: string
  title: string
  category: string
}) {
  const backgroundImageUrl =
    'https://picsum.photos/seed/' + identifier + '/200/200'
  const cardImageUrl = 'https://picsum.photos/seed/' + identifier + '/200/200'

  const [isFavorite, setIsFavorite] = useState(
    getFavorite(identifier) !== undefined ? true : false
  )

  if (isFavorite === true && getFavorite(identifier) === undefined)
    setIsFavorite(false)

  let currentAction = (
    <div
      onClick={() => {
        addFavorite(identifier, title)
        setIsFavorite(true)
      }}
    >
      <IconButton>
        <FavoriteBorderIcon />
      </IconButton>
    </div>
  )

  if (isFavorite)
    currentAction = (
      <div
        onClick={() => {
          removeFavorite(identifier)
          setIsFavorite(false)
        }}
      >
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      </div>
    )

  return (
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
          height: '10rem',
          width: 'auto'
        }}
      >
        <CardMedia
          image={backgroundImageUrl}
          sx={{
            filter: 'blur(20px)',
            height: '100%',
            width: '100%'
          }}
        />
        <CardMedia
          component='img'
          image={cardImageUrl}
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
          {transformUppercase(retailer)}
        </Typography>
        <Typography gutterBottom variant='h6'>
          {title}
        </Typography>
        <Typography variant='caption'>{category}</Typography>
      </CardContent>
      <CardActions>{currentAction}</CardActions>
    </Card>
  )
}
