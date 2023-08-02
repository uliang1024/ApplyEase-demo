import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    const { id: userId, displayName, photos } = req.session?.passport?.user || {};
    const photoURL = photos?.[0]?.value;
    const classes = await getClasses(userId);
    const schools = await getSchools();

    res.render('index', { displayName, photoURL, classes, schools });
});

export default router;