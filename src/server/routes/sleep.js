const SleepHistory = require('../models/SleepHistory')
const auth = require('../middleware/auth.middleware')
const { Router } = require('express')

const router = Router()

router.get('/', auth, async (req, res) => {
	try {
		const sleepHistory = await SleepHistory.find({ userId: req.user.userId })

		res.status(200).json(
			sleepHistory
		)

	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
	}
})
router.post('/', auth, async (req, res) => {
	try {
		const { endAt, riseAt } = req.body

		const sleepHistory = new SleepHistory({
			userId: req.user.userId,
			endAt,
			riseAt
		})
		await sleepHistory.save()

		res.status(201).json({
			sleepHistory
		})

	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
	}
})

router.put('/:id', auth, async (req, res) => {
	try {
		const { endAt, riseAt } = req.body

		const sleepHistory = await SleepHistory.findById(req.params.id, (err) => {
			if (err) return res.status(404).json({ message: 'Объект с данным ID не найден' })
		})

		sleepHistory.endAt = endAt || sleepHistory.endAt
		sleepHistory.riseAt = riseAt || sleepHistory.riseAt

		await weightHistory.save()

		res.status(200).json({
			sleepHistory
		})

	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {

		await SleepHistory.deleteOne({ _id: req.params.id }, (err) => {
			if (err) return res.status(404).json({ message: 'Объект с данным ID не найден' })
		})

		res.status(200).json({
			message: "Успешно"
		})

	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже' })
	}
})


module.exports = router