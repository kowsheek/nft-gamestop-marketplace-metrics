import AggregateData from '../../raw/data/aggregate.json'

export default function handler(req, res) {
    res.status(200).json(AggregateData)
}