import { motion, AnimatePresence } from "framer-motion";

const variants = {
    hidden: { scale: 0 },
    visible: { scale: 1 }
}

export const Rules = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div className="rules" initial="hidden" animate="visible" exit={{ scale: 0 }} variants={variants}>
                    <p>Règles du jeu : <br />Un mot est choisi au hasard, votre but est de trouver le mot en saisissant le moins de mots possibles.<br />La première lettre vous sera toujours donnée, à vous de trouver le reste.</p>
                    <p>Signification des symboles : </p>
                </motion.div >
            )}
        </AnimatePresence>
    );
}