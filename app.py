from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__)

# NOTAS DE CORTE DE REFERÊNCIA
# Dicionário com dados de exemplo do material de treinamento
# Inclui notas de corte para o PSC, SIS e Macro
NOTAS_CORTE = {
    # Dados para o PSC
    'Medicina-AC-PSC': {'nota_final': 420.0, 'peso_red': 6},
    'Medicina-Cotas-PSC': {'nota_final': 380.0, 'peso_red': 6},
    
    # Dados para o SIS - Apenas modalidade de Ensino Médio
    'Medicina-AC-SIS': {'nota_final': 192.840, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Odontologia-AC-SIS': {'nota_final': 180.000, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Enfermagem-AC-SIS': {'nota_final': 150.123, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Fisioterapia-AC-SIS': {'nota_final': 160.456, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Farmácia-AC-SIS': {'nota_final': 155.789, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Nutrição-AC-SIS': {'nota_final': 145.321, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Sistemas de Informação-AC-SIS': {'nota_final': 120.500, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    'Engenharia de Computação-AC-SIS': {'nota_final': 165.200, 'peso_red_sis2': 2, 'peso_red_sis3': 2},
    
    # Dados de exemplo para o MACRO
    'Medicina-AC-Macro': {'nota_final': 94.429, 'peso_cg': 1, 'peso_ce': 1},
    'Direito-AC-Macro': {'nota_final': 88.238, 'peso_cg': 1, 'peso_ce': 1},
    'Ciências Biológicas-AC-Macro': {'nota_final': 0.0, 'peso_cg': 1, 'peso_ce': 1},
    'Engenharia de Computação-AC-Macro': {'nota_final': 0.0, 'peso_cg': 1, 'peso_ce': 1},
    'Sistemas de Informação-AC-Macro': {'nota_final': 0.0, 'peso_cg': 1, 'peso_ce': 1},
}

# Rota principal para a página inicial
@app.route('/')
def home():
    # Esta rota renderiza o arquivo index.html que contém o formulário
    return render_template('index.html')

# Rota de simulação para calcular as notas
@app.route('/simular_notas', methods=['POST'])
def simular_notas():
    try:
        dados_aluno = request.get_json()
        vestibular = dados_aluno.get('vestibular')
        curso = dados_aluno.get('curso')
        modalidade = dados_aluno.get('modalidade')

        # Cria uma chave única para buscar a nota de corte no dicionário
        chave_curso = f"{curso}-{modalidade}-{vestibular}"

        # Verifica se o curso e vestibular existem nos nossos dados de referência
        if chave_curso not in NOTAS_CORTE:
            return jsonify({'mensagem': 'Curso, modalidade ou vestibular não encontrados. Verifique os dados.'})

        nota_corte = NOTAS_CORTE[chave_curso]['nota_final']
        
        # --- Lógica de Simulação para o PSC ---
        if vestibular == 'PSC':
            acertos_psc1 = int(dados_aluno.get('acertos_psc1', 0))
            acertos_psc2 = int(dados_aluno.get('acertos_psc2', 0))
            nota_redacao_psc = float(dados_aluno.get('nota_redacao_psc', 0.0))
            peso_redacao_psc = NOTAS_CORTE[chave_curso]['peso_red']

            # Pontuação já obtida
            pontuacao_psc1 = acertos_psc1 * 3
            pontuacao_psc2 = acertos_psc2 * 3
            pontuacao_redacao = nota_redacao_psc * peso_redacao_psc
            pontos_ja_feitos = pontuacao_psc1 + pontuacao_psc2 + pontuacao_redacao

            # Pontuação restante
            pontos_restantes = nota_corte - pontos_ja_feitos
            
            # Mensagem de resultado para o usuário
            if acertos_psc1 == 0 and acertos_psc2 == 0:
                mensagem = f"Sua meta é de {nota_corte:.2f} pontos. Você precisa de {pontos_restantes:.2f} pontos no total."
            elif acertos_psc1 > 0 and acertos_psc2 > 0:
                acertos_necessarios_psc3 = pontos_restantes / 3
                mensagem = f"Faltam {pontos_restantes:.2f} pontos. Você precisa de aproximadamente {acertos_necessarios_psc3:.0f} acertos no PSC 3 para atingir a nota de corte."
            else:
                mensagem = f"Sua pontuação parcial é de {pontos_ja_feitos:.2f}. Faltam {pontos_restantes:.2f} pontos para a nota de corte."

            return jsonify({'mensagem': mensagem})

        # --- Lógica de Simulação para o SIS ---
        elif vestibular == 'SIS':
            acertos_sis1 = int(dados_aluno.get('acertos_sis1', 0))
            acertos_sis2_obj = int(dados_aluno.get('acertos_sis2_obj', 0))
            nota_red_sis2 = float(dados_aluno.get('nota_red_sis2', 0.0))
            
            # Pesos da redação do material de treinamento
            peso_redacao_sis2 = NOTAS_CORTE[chave_curso]['peso_red_sis2']

            # Pontuação já obtida
            pontuacao_sis1 = acertos_sis1
            pontuacao_sis2_red = nota_red_sis2 * peso_redacao_sis2
            pontuacao_total_sis2 = acertos_sis2_obj + pontuacao_sis2_red
            pontos_ja_feitos = pontuacao_sis1 + pontuacao_total_sis2
            
            # Pontuação restante
            pontos_restantes = nota_corte - pontos_ja_feitos

            # Simulação para o SIS 3
            acertos_sis3_obj_necessarios = pontos_restantes - (9.0 * NOTAS_CORTE[chave_curso]['peso_red_sis3'])
            if acertos_sis3_obj_necessarios < 0:
                 acertos_sis3_obj_necessarios = 0

            mensagem = f"Sua pontuação atual é de {pontos_ja_feitos:.2f}. Faltam {pontos_restantes:.2f} pontos para a nota de corte. Você precisa de aproximadamente {acertos_sis3_obj_necessarios:.0f} acertos na prova objetiva do SIS 3 (assumindo nota 9 na redação)."
            return jsonify({'mensagem': mensagem})
        
        # --- Lógica de Simulação para o Macro ---
        elif vestibular == 'Macro':
            pontuacao_cg = float(dados_aluno.get('pontuacao_cg', 0.0))
            pontuacao_ce = float(dados_aluno.get('pontuacao_ce', 0.0))

            # Pontuação já obtida
            pontos_ja_feitos = pontuacao_cg + pontuacao_ce
            
            # Pontuação restante
            pontos_restantes = nota_corte - pontos_ja_feitos

            # A lógica para o Macro pode ser expandida aqui, se necessário
            mensagem = f"Sua pontuação atual é de {pontos_ja_feitos:.3f}. A nota de corte é {nota_corte:.3f}. Faltam {pontos_restantes:.3f} pontos."
            return jsonify({'mensagem': mensagem})
        
        else:
            return jsonify({'mensagem': 'Vestibular não cadastrado na base de dados. Tente "PSC", "SIS" ou "Macro".'})

    except (ValueError, TypeError) as e:
        return jsonify({'mensagem': f"Erro nos dados inseridos. Por favor, verifique se os valores estão corretos. Erro: {e}"})

# Inicia o servidor web do Flask em modo de depuração
if __name__ == '__main__':
    app.run(debug=True)
