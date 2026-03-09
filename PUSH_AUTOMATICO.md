# 🚀 Guía de Push Automático

Scripts para automatizar el proceso de `git add`, `commit` y `push`.

---

## 📁 Archivos

| Archivo | Descripción |
|---------|-------------|
| `auto-push.ps1` | Script interactivo con confirmaciones |
| `auto-push-silent.ps1` | Script silencioso para automatización |

---

## 🎯 Uso del Script Interactivo (`auto-push.ps1`)

### Opción 1: Ejecutar con mensaje automático
```powershell
.\auto-push.ps1
```
Te pedirá confirmación y usará un mensaje por defecto con la fecha/hora.

### Opción 2: Ejecutar con mensaje personalizado
```powershell
.\auto-push.ps1 -CommitMessage "Fix: corrección de bug en navbar"
```

### Opción 3: Modo simulación (sin hacer cambios reales)
```powershell
.\auto-push.ps1 -DryRun
```

### Opción 4: Forzar sin confirmación
```powershell
.\auto-push.ps1 -CommitMessage "Update" -Force
```

### Opción 5: Push a otra rama
```powershell
.\auto-push.ps1 -Branch "develop"
```

---

## 🤖 Uso del Script Silencioso (`auto-push-silent.ps1`)

Ideal para automatización, hooks de git, o tareas programadas.

### Uso básico
```powershell
.\auto-push-silent.ps1
```

### Con mensaje personalizado
```powershell
.\auto-push-silent.ps1 -CommitMessage "Deploy automático"
```

---

## ⏰ Automatización con Programador de Tareas (Windows)

Para ejecutar push automático cada cierto tiempo:

### 1. Abrir Programador de Tareas
```powershell
taskschd.msc
```

### 2. Crear nueva tarea básica
- **Nombre:** `Fabipets Auto Push`
- **Trigger:** Diariamente o según necesidad
- **Action:** Iniciar programa
- **Programa:** `powershell.exe`
- **Argumentos:** `-ExecutionPolicy Bypass -File "C:\Users\PC\Documents\FABIPETS.COM\auto-push-silent.ps1"`

---

## 🔄 Git Hook (Auto-push al hacer commit)

Si quieres hacer push automático cada vez que haces commit local:

### 1. Editar el hook post-commit
```powershell
notepad .git\hooks\post-commit
```

### 2. Agregar contenido:
```bash
#!/bin/sh
# Auto-push después de cada commit
powershell.exe -ExecutionPolicy Bypass -File "C:\Users\PC\Documents\FABIPETS.COM\auto-push-silent.ps1"
```

### 3. Hacer ejecutable (Git Bash):
```bash
chmod +x .git/hooks/post-commit
```

---

## ⚠️ Precauciones

1. **No uses auto-push en repositorios compartidos** sin coordinar con el equipo
2. **Revisa siempre los cambios** antes de hacer push automático
3. **Ten cuidado con archivos sensibles** (contraseñas, tokens, etc.)
4. **El script no hace pull**, podría haber conflictos si hay cambios remotos

---

## 🛠️ Solución de Problemas

### Error: "No estás en un repositorio Git"
Asegúrate de ejecutar el script desde la carpeta del proyecto.

### Error: "Permiso denegado"
Ejecuta PowerShell como administrador o usa:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Error: "Autenticación fallida"
Configura tus credenciales de Git:
```powershell
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

Para GitHub, usa un token de acceso personal o configura Git Credential Manager.
