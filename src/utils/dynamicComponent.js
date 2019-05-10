import { app } from '@/index.js'
import dynamic from 'dva/dynamic'

const loadComponent = (models, component) => {
  return dynamic({
    app,
    models: () => models.map(name => import(`@/models/${name}`)),
    component
  })
}

export default loadComponent