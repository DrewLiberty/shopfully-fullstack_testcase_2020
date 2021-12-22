import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'

import React, { Suspense } from 'react'
import { Flyer, call } from '../api/services/Flyer'
import { Pagination } from '@mui/material'
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

  componentDidMount () {
    this.fetch()
  }

  onPageChangeHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    this.setState(
      prevState => ({
        pages: {
          ...prevState.pages,
          current: page
        }
      }),
      this.fetch
    )
  }

  fetch () {
    call(this.state.pages.current)
      .then(res => {
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
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>
    } else {
      return (
        <Container disableGutters maxWidth={false}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.items.map(item => {
              return (
                <Grid item key={item.id} xs={6} sm={4} md={2}>
                  <Suspense fallback={<div>Loading...</div>}>
                    <ContentCardLazy
                      identifier={item.id}
                      retailer={item.retailer}
                      title={item.title}
                      category={item.category}
                    />
                  </Suspense>
                </Grid>
              )
            })}
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
