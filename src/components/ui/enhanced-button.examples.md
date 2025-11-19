# EnhancedButton - Documentação e Exemplos

## Visão Geral

O `EnhancedButton` é um componente de botão avançado que utiliza estratégias de composition, similar aos padrões dos componentes `PageBlocks` e `PageContainer` do projeto. Ele oferece suporte automático a loading, ícones posicionados e variantes de cores personalizadas.

## Importação

```tsx
import { 
  EnhancedButton, 
  EnhancedButtonLeft, 
  EnhancedButtonContent, 
  EnhancedButtonRight 
} from '@/components/ui/enhanced-button'
```

## Exemplos de Uso

### 1. Botão Simples

```tsx
<EnhancedButton>
  <EnhancedButtonContent>
    Salvar
  </EnhancedButtonContent>
</EnhancedButton>
```

### 2. Botão com Ícone à Esquerda

```tsx
<EnhancedButton variant="ametista">
  <EnhancedButtonLeft>
    <Save className="w-4 h-4" />
  </EnhancedButtonLeft>
  <EnhancedButtonContent>
    Salvar Alterações
  </EnhancedButtonContent>
</EnhancedButton>
```

### 3. Botão com Ícone à Direita

```tsx
<EnhancedButton variant="outline">
  <EnhancedButtonContent>
    Ver Mais
  </EnhancedButtonContent>
  <EnhancedButtonRight>
    <ChevronRight className="w-4 h-4" />
  </EnhancedButtonRight>
</EnhancedButton>
```

### 4. Botão com Loading Automático

```tsx
const [isLoading, setIsLoading] = useState(false)

<EnhancedButton 
  loading={isLoading}
  loadingText="Salvando..."
  onClick={handleSave}
>
  <EnhancedButtonLeft>
    <Save className="w-4 h-4" />
  </EnhancedButtonLeft>
  <EnhancedButtonContent>
    Salvar
  </EnhancedButtonContent>
</EnhancedButton>
```

### 5. Botão Destrutivo com Composição Completa

```tsx
<EnhancedButton 
  variant="vermelho"
  loading={isDeleting}
  loadingText="Deletando..."
  onClick={handleDelete}
>
  <EnhancedButtonLeft>
    <Trash2 className="w-4 h-4" />
  </EnhancedButtonLeft>
  <EnhancedButtonContent>
    Excluir Item
  </EnhancedButtonContent>
</EnhancedButton>
```

### 6. Botão de Login (Exemplo Completo)

```tsx
<EnhancedButton
  type="submit"
  className="w-full"
  loading={loading}
  loadingText="Entrando..."
  variant="ametista"
>
  <EnhancedButtonLeft>
    <LogIn className="w-4 h-4" />
  </EnhancedButtonLeft>
  <EnhancedButtonContent>
    Entrar
  </EnhancedButtonContent>
</EnhancedButton>
```

## Variantes Disponíveis

### Variantes Padrão do shadcn/ui
- `default` - Estilo padrão (azul)
- `destructive` - Para ações destrutivas (vermelho)
- `outline` - Botão com borda
- `secondary` - Estilo secundário (cinza)
- `ghost` - Sem fundo
- `link` - Estilo de link

### Variantes Personalizadas do Projeto
- `ametista` - Cor principal roxa do projeto
- `ametista-outline` - Borda roxa
- `grafite` - Cor escura do projeto
- `grafite-outline` - Borda escura
- `vermelho` - Cor vermelha do projeto
- `vermelho-outline` - Borda vermelha

## Tamanhos

- `default` - Tamanho padrão
- `sm` - Pequeno
- `lg` - Grande
- `icon` - Para botões de ícone

## Props Especiais

### `loading: boolean`
Ativa o estado de loading automático. Quando `true`:
- Mostra ícone de loading (spinner)
- Desabilita o botão automaticamente
- Substitui o conteúdo pelo `loadingText` se fornecido

### `loadingText: string`
Texto a ser exibido durante o loading. Se não fornecido, mantém o conteúdo original.

## Vantagens da Composition

1. **Flexibilidade**: Permite posicionar ícones exatamente onde necessário
2. **Reutilização**: Componentes pequenos e focados em uma responsabilidade
3. **Consistência**: Segue o padrão estabelecido no projeto
4. **Manutenibilidade**: Fácil de modificar e estender

## Migração do Button Antigo

### Antes:
```tsx
<Button disabled={loading}>
  {loading ? (
    <div className="flex items-center gap-2">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
      Salvando...
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Save size={18} />
      Salvar
    </div>
  )}
</Button>
```

### Depois:
```tsx
<EnhancedButton 
  loading={loading}
  loadingText="Salvando..."
>
  <EnhancedButtonLeft>
    <Save className="w-4 h-4" />
  </EnhancedButtonLeft>
  <EnhancedButtonContent>
    Salvar
  </EnhancedButtonContent>
</EnhancedButton>
``` 