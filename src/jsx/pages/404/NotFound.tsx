import React from "react";
import styles from './NotFound.module.scss'


const NotFound = () =>
    <div className={styles.notFound}>
        <span>404</span>
        <h2>Ничего не найдено :(</h2>
    </div>


export default NotFound;