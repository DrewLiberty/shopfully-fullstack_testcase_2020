import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FavoriteIcon from '@mui/icons-material/Favorite'
import {
  getAll as getAllFavorite,
  remove as removeFavorite
} from '../api/services/Favorites'
import { useState } from 'react'

export default function ListItems () {
  const [items, setItems] = useState(getAllFavorite())

  return (
    <div>
      {items.map(item => (
        <ListItem
          button
          key={item.identifier}
          onClick={() => {
            removeFavorite(item.identifier)
            setItems(getAllFavorite())
          }}
        >
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText secondary={item.title} />
        </ListItem>
      ))}
    </div>
  )
}
