export enum ColumnWidthMetrics {
  em = 'em',
  px = 'px'
}

export type ColumnSetup = {
  title: string
  width?: {
    value: number,
    metric: ColumnWidthMetrics
  }
  // 'true' means from A to Z, 'false' means from Z to A, 'undefined' means to be not sorted
  sortAtoZ?: boolean
}
