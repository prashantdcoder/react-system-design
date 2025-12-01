import React from "react";
import { v4 as uuidv4 } from "uuid";

const generateUniqueId = (): string => {
    return uuidv4();
};

export { generateUniqueId };
