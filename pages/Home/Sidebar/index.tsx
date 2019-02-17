import { Footer } from '~/components'

import Icymi from './Icymi'
import Tags from './Tags'
import Topics from './Topics'

import styles from './styles.css'

export default () => (
  <>
    <section>
      <Icymi />
    </section>
    <section>
      <Topics />
    </section>
    <section>
      <Tags />
    </section>
    <Footer />
    <style jsx>{styles}</style>
  </>
)