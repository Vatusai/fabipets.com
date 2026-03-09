# 🚀 Guía de Desarrollo Local - fabipets.com

## 📋 Requisitos

- ✅ Node.js v25.8.0 (instalado)
- ✅ npm v11.11.0 (instalado)
- ✅ Git (instalado)

---

## 🎯 Iniciar Servidor de Desarrollo

### Opción 1: Doble clic (Recomendado)
Haz doble clic en **`dev-server.bat`**

### Opción 2: PowerShell
```powershell
.\dev-server.ps1
```

### Opción 3: Comando directo
```powershell
npm run dev
```

---

## 🌐 URLs de Acceso

| URL | Descripción |
|-----|-------------|
| `http://localhost:5173` | Desde tu computadora |
| `http://TU-IP:5173` | Desde otros dispositivos en tu red |

> 💡 **Hot Reload**: Los cambios en el código se reflejan automáticamente en el navegador

---

## 🔄 Flujo de Trabajo Recomendado

```
1. Iniciar servidor  →  npm run dev
                        ↓
2. Editar archivos   →  src/ (React components)
   (en tu editor)        public/ (assets estáticos)
                        ↓
3. Ver cambios       →  http://localhost:5173
   (navegador)           (actualiza automático)
                        ↓
4. Guardar cambios   →  auto-push.ps1
   (cuando estés         (o push.bat)
    satisfecho)
```

---

## 📁 Estructura del Proyecto

```
fabipets.com/
├── src/                    ← Código fuente React
│   ├── components/         ← Componentes reutilizables
│   ├── pages/              ← Páginas de la app
│   ├── App.tsx             ← Componente principal
│   └── main.tsx            ← Punto de entrada
├── public/                 ← Archivos públicos
│   └── (imágenes, fonts)
├── index.html              ← HTML principal
├── package.json            ← Dependencias
└── vite.config.ts          ← Configuración Vite
```

---

## 🛠️ Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo |
| `npm run build` | Compilar para producción |
| `npm run preview` | Previsualizar build de producción |
| `npm run lint` | Ejecutar linter |

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```powershell
npm install
```

### Error: "Port 5173 is already in use"
Cambia el puerto en `vite.config.ts` o mata el proceso:
```powershell
npx kill-port 5173
```

### Los cambios no se ven
- Presiona `Ctrl+Shift+R` en el navegador (hard refresh)
- Verifica la consola del navegador (F12) para errores

---

## 🌟 Tips de Productividad

1. **Extensiones VS Code recomendadas:**
   - ESLint
   - Tailwind CSS IntelliSense
   - TypeScript Importer

2. **Atajos útiles:**
   - `Ctrl+C` en terminal = Detener servidor
   - `rs` + Enter = Reiniciar servidor (si usa nodemon)

3. **Ver en móvil:**
   - Conecta tu celular a la misma red WiFi
   - Accede a `http://IP-DE-TU-PC:5173`
