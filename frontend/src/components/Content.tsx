import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import React, { Suspense, useEffect, useState } from 'react'
import { Flyer, call } from '../api/services/Flyer'
import { Pagination, Stack } from '@mui/material'
// import ContentCard from './ContentCard'

const ContentCardLazy = React.lazy(() => import('./ContentCard'))

interface IProps {}

interface IPages {
  current: number
  previous: number
  next: number
  total: number
}

interface IState {
  error: any
  isLoaded: boolean
  items: Array<Flyer>
  pages: IPages
}
class Content extends React.Component<IProps, IState> {
  constructor (props: any) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      pages: {
        current: 1,
        previous: 1,
        next: 1,
        total: 1
      }
    }
  }

  componentWillMount () {
    this.fetch()
  }

  // componentWillUpdate() {
  //   this.fetch();
  // }

  onPageChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log('pagina selezionata ' + page)
    this.setState(prevState => ({
      pages: {
        ...prevState.pages,
        current: page
      }
    }), this.fetch)
  }

  fetch () {
    console.log('fetching con pagina ' + this.state.pages.current);
    call(this.state.pages.current)
      .then(res => {
        console.log('fetching terminato');
        this.setState({ isLoaded: true })
        this.setState({ items: res.data })

        let pages = this.state.pages

        if (res.previous) pages.previous = res.previous
        if (res.next) pages.next = res.next
        if (res.total) pages.total = res.total

        this.setState({ pages })
      })
      .catch(err => {
        this.setState({ isLoaded: true })
        this.setState({ error: err })
      })
  }

  render () {
    console.log('rendering')
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <Container disableGutters maxWidth={false}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Suspense fallback={<div>Loading...</div>}>
              {this.state.items.map(item => {
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

          <Container sx={{ marginTop: '4rem' }}>
            <Pagination
              onChange={this.onPageChangeHandler}
              count={this.state.pages.total}
              color='secondary'
              sx={{ margin: '0 auto', width: 'max-content' }}
            />
          </Container>
        </Container>
      )
    }
  }
}

export default Content

// export default function Content () {
//   const [error, setError] = useState<any>(null)
//   const [isLoaded, setIsLoaded] = useState(false)
//   const [items, setItems] = useState<Array<Flyer>>([])
//   const [previousPage, setPreviousPage] = useState<number>(1)
//   const [nextPage, setNextPage] = useState<number>(1)
//   const [totalPages, setTotalPages] = useState<number>(1)
//   const [currentPage, setCurrentPage] = useState<number>(1)

//   const onPageChangeHandler = (
//     event: React.ChangeEvent<unknown>,
//     page: number
//   ) => {
//     console.log('sono qua ' + page)
//     setCurrentPage(page)
//   }

//   // questo useEffect verrà eseguito una volta
//   // simile a componentDidMount()
//   useEffect(() => {
//     console.log('sono qua useEffect')
//     call(currentPage)
//       .then(res => {
//         setIsLoaded(true)
//         setItems(res.data)
//         if (res.previous) setPreviousPage(res.previous)
//         if (res.next) setNextPage(res.next)
//         if (res.total) setTotalPages(res.total)
//       })
//       .catch(err => {
//         setIsLoaded(true)
//         setError(err)
//       })
//   }, [])

//   if (error) {
//     return <div>Error: {error.message}</div>
//   } else if (!isLoaded) {
//     return <div>Loading...</div>
//   } else {
//     console.log('sono qua render')
//   }
// }
