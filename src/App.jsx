import styles from "./App.module.css";
import {Calculator} from "./components/Calculator/Calculator.jsx";

function App() {

    return (
        <section className={styles.section}>
            <Calculator/>
        </section>

    )
}

export default App
