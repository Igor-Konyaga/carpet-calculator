import styles from './styles.module.css';
import {useState} from "react";

export function Calculator() {
    const [carpetWidth, setCarpetWidth] = useState('');
    const [carpetHeight, setCarpetHeight] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [long, setLong] = useState(false);
    const [smells, setSmells] = useState(false);
    const [pollution, setPollution] = useState(false);
    const [resultPrice, setResultPrice] = useState(0);


    const handleWidthChange = (e) => {
        setCarpetWidth(e.target.value);
    }
    const handleHeightChange = (e) => {
        setCarpetHeight(e.target.value);

    }
    const handleDeliveryChange = () => {
        setDelivery(!delivery)
    }
    const handleLongChange = () => {
        setLong(!long)
    }
    const handlesSmellsChange = () => {
        setSmells(!smells)
    }
    const handlePollutionChange = () => {
        setPollution(!pollution)
    }

    const calculationCostCarpet = (width, height, del, lg, sm, poll) => {
        let standardPrice = 90;
        const DELIVERY_PRICE = 150;
        const LONG_PRICE = 10;
        const ADDITIONAL_PRICE = 30;
        const MIN_PRICE = 500;
        const resultSize = width * height;

        if (sm) {
            standardPrice += ADDITIONAL_PRICE;
        }

        if (poll) {
            standardPrice += ADDITIONAL_PRICE;
        }

        if (lg) {
            standardPrice += LONG_PRICE;
        }

        if (del) {
            const resSum = standardPrice * resultSize + DELIVERY_PRICE;
            return resSum < MIN_PRICE ? MIN_PRICE : resSum;
        }

        if (standardPrice * resultSize < MIN_PRICE) {
            return MIN_PRICE;
        }

        return standardPrice * resultSize;

    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const sum = Math.round(calculationCostCarpet(carpetWidth, carpetHeight, delivery, long, smells, pollution));

        setResultPrice(sum);

        setCarpetWidth('');
        setCarpetHeight('');
    }

    return (
        <div className={styles.wrapperCalculator}>
            <h1 className={styles.title}>Розрахунок вартості прання килимів</h1>
            <form className={styles.form} onSubmit={handleSubmitForm}>
                <div className={styles.wrapperInputs}>
                    <label className={styles.label}>
                        Довжина (м)
                        <input className={styles.input} onChange={handleHeightChange} value={carpetHeight}
                               type="number" placeholder='3.2'/>
                    </label>
                    <label className={styles.label}>
                        Ширина (м)
                        <input className={styles.input} onChange={handleWidthChange} value={carpetWidth} type="number"
                               placeholder='2.2'/>
                    </label>
                </div>
                <div className={styles.wrapperCheckbox}>
                    <label className={styles.labelCheckbox}>
                        <input className={styles.checkbox} type='checkbox' onChange={handleDeliveryChange}/>
                        Доставка
                    </label>
                    <label className={styles.labelCheckbox}>
                        <input className={styles.checkbox} type='checkbox' onChange={handleLongChange}/>
                        Довгий ворс
                    </label>
                    <label className={styles.labelCheckbox}>
                        <input className={styles.checkbox} type='checkbox' onChange={handlePollutionChange}/>
                        Сильне забруднення
                    </label>
                    <label className={styles.labelCheckbox}>
                        <input className={styles.checkbox} type='checkbox' onChange={handlesSmellsChange}/>
                        Усунення неприємних запахів
                    </label>
                </div>
                <button disabled={carpetHeight === '' || carpetWidth === ''} className={styles.submitBtn}
                        type='submit'>Розрахувати
                </button>
                <p className={styles.sumPrice}>Приблизна вартість: <span
                    className={styles.priceValue}>{resultPrice} грн</span></p>
            </form>
        </div>

    )
}