import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function ListItems () {
  return (
    <div>
      {items.map((item) => (
        <ListItem button>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText secondary={item + ' Flyer Title'} />
        </ListItem>
      ))}
    </div>
  )
}
