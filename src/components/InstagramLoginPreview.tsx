import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Instagram, Facebook } from 'lucide-react'

export function InstagramLoginPreview() {
  return (
    <Card className="max-w-md mx-auto oauth-demo-window">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Instagram className="w-12 h-12 text-gray-900" />
        </div>
        <CardTitle className="text-2xl font-light text-gray-900" style={{ fontFamily: 'cursive' }}>
          Instagram
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input 
            placeholder="Teléfono, usuario o correo electrónico"
            className="bg-gray-50 border-gray-300 text-sm"
            disabled
          />
          <Input 
            type="password"
            placeholder="Contraseña"
            className="bg-gray-50 border-gray-300 text-sm"
            disabled
          />
        </div>
        
        <Button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2"
          disabled
        >
          Entrar
        </Button>
        
        <div className="flex items-center justify-center space-x-4 my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm font-medium">O</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full text-blue-900 font-medium hover:bg-blue-50"
          disabled
        >
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          Iniciar sesión con Facebook
        </Button>
        
        <div className="text-center">
          <button className="text-blue-900 text-sm hover:underline" disabled>
            ¿Has olvidado la contraseña?
          </button>
        </div>
      </CardContent>
      
      <div className="border-t border-gray-200 p-4 text-center">
        <p className="text-gray-600 text-sm">
          ¿No tienes una cuenta?{' '}
          <button className="text-blue-600 font-medium hover:underline" disabled>
            Regístrate
          </button>
        </p>
      </div>
      
      <div className="px-4 pb-4">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Al continuar, aceptas nuestras{' '}
          <button className="hover:underline" disabled>Condiciones</button>,{' '}
          <button className="hover:underline" disabled>Política de datos</button> y{' '}
          <button className="hover:underline" disabled>Política de cookies</button>.
        </p>
      </div>
    </Card>
  )
}