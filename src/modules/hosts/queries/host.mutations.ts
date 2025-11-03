import { Delete } from "@nestjs/common";

export const HOST_MUTATION = {
   CREATE: `
        INSERT INTO \`anfitrion\` (id_anfitrion, calificacion_promedio, fecha_registro)
    VALUES (?, ?, ?)
  `,
    UPDATE_CORE: `
        UPDATE \`anfitrion\`
        SET calificacion_promedio = ?, fecha_registro = ?
        WHERE id_anfitrion = ?
    `,
    DELETE: `
        DELETE FROM \`anfitrion\`
        WHERE id_anfitrion = ?
    `,
} as const;