import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import React, { Suspense, useEffect, useState } from 'react'
import { Flyer, call } from '../api/services/Flyer'

const ContentCardLazy = React.lazy(() => import('./ContentCard'))

export default function Content () {
  const [error, setError] = useState < any > (null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState < Array < Flyer >> ([])
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
          <Suspense fallback={<div>Loading...</div>}>
            {items.map(item => {
              return (
                <Grid item key={item.id} xs={6} sm={4} md={2}>
                  <ContentCardLazy
                    identifier={item.id}
                    retailer={item.retailer}
                    title={item.title}
                    category={item.category}
                  />
                </Grid>
              )
            })}
          </Suspense>
        </Grid>
      </Container>
    )
  }
}
