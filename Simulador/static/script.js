document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simulador-form');
    const resultadoDiv = document.getElementById('resultado');
    const vestibularSelect = document.getElementById('vestibular');
    const cursoSelect = document.getElementById('curso');
    const modalidadeSelect = document.getElementById('modalidade');
    const pscFields = document.getElementById('campos-psc');
    const sisFields = document.getElementById('campos-sis');
    const macroFields = document.getElementById('campos-macro');

    // Dados de cursos e modalidades por vestibular
    const cursosPorVestibular = {
        'PSC': [
            { label: "Medicina", value: "Medicina" },
            { label: "Direito", value: "Direito" },
            { label: "Pedagogia", value: "Pedagogia" },
            { label: "Administração", value: "Administração" },
            { label: "Ciências Contábeis", value: "Ciências Contábeis" },
            { label: "Ciências Econômicas", value: "Ciências Econômicas" },
            { label: "Arquitetura e Urbanismo", value: "Arquitetura e Urbanismo" },
            { label: "Design", value: "Design" },
            { label: "Engenharia Civil", value: "Engenharia Civil" },
            { label: "Engenharia da Computação", value: "Engenharia da Computação" },
            { label: "Engenharia de Materiais", value: "Engenharia de Materiais" },
            { label: "Engenharia de Petróleo e Gás", value: "Engenharia de Petróleo e Gás" },
            { label: "Engenharia de Produção", value: "Engenharia de Produção" },
            { label: "Engenharia Elétrica - Eletrônica", value: "Engenharia Elétrica - Eletrônica" },
            { label: "Engenharia Elétrica - Eletrotécnica", value: "Engenharia Elétrica - Eletrotécnica" },
            { label: "Engenharia Elétrica - Telecomunicações", value: "Engenharia Elétrica - Telecomunicações" },
            { label: "Engenharia Mecânica", value: "Engenharia Mecânica" },
            { label: "Engenharia Química", value: "Engenharia Química" },
            { label: "Artes Visuais", value: "Artes Visuais" },
            { label: "Estatística", value: "Estatística" },
            { label: "Engenharia Física", value: "Engenharia Física" },
            { label: "Física", value: "Física" },
            { label: "Geologia", value: "Geologia" },
            { label: "Matemática", value: "Matemática" },
            { label: "Matemática Pura e Aplicada", value: "Matemática Pura e Aplicada" },
            { label: "Química", value: "Química" },
            { label: "Ciências Sociais", value: "Ciências Sociais" },
            { label: "Filosofia", value: "Filosofia" },
            { label: "Geografia", value: "Geografia" },
            { label: "História", value: "História" },
            { label: "Serviço Social", value: "Serviço Social" },
            { label: "Arquivologia", value: "Arquivologia" },
            { label: "Biblioteconomia", value: "Biblioteconomia" },
            { label: "Jornalismo", value: "Jornalismo" },
            { label: "Relações Públicas", value: "Relações Públicas" },
            { label: "Letras - Língua e Literatura Espanhola", value: "Letras - Língua e Literatura Espanhola" },
            { label: "Letras - Língua e Literatura Francesa", value: "Letras - Língua e Literatura Francesa" },
            { label: "Letras - Língua e Literatura Inglesa", value: "Letras - Língua e Literatura Inglesa" },
            { label: "Letras - Língua e Literatura Japonesa", value: "Letras - Língua e Literatura Japonesa" },
            { label: "Letras - Língua e Literatura Portuguesa", value: "Letras - Língua e Literatura Portuguesa" },
            { label: "Computação [ABI]", value: "Computação [ABI]" },
            { label: "ABI - Educação Física", value: "ABI - Educação Física" },
            { label: "Educação Física", value: "Educação Física" },
            { label: "Fisioterapia", value: "Fisioterapia" },
            { label: "Agronomia", value: "Agronomia" },
            { label: "Engenharia Florestal", value: "Engenharia Florestal" },
            { label: "Engenharia de Alimentos", value: "Engenharia de Alimentos" },
            { label: "Engenharia de Pesca", value: "Engenharia de Pesca" },
            { label: "Zootecnia", value: "Zootecnia" },
            { label: "Farmácia", value: "Farmácia" },
            { label: "Psicologia - Formação de Psicólogo", value: "Psicologia - Formação de Psicólogo" },
            { label: "Biotecnologia", value: "Biotecnologia" },
            { label: "Ciências Biológicas", value: "Ciências Biológicas" },
            { label: "Ciências Naturais", value: "Ciências Naturais" },
            { label: "Enfermagem", value: "Enfermagem" },
            { label: "Odontologia", value: "Odontologia" },
        ],
        'SIS': [
            { label: "Ciências Biológicas", value: "Ciências Biológicas" },
            { label: "Ciências da Religião - 1ª Licenciatura", value: "Ciências da Religião - 1ª Licenciatura" },
            { label: "Dança", value: "Dança" },
            { label: "Educação Física", value: "Educação Física" },
            { label: "Física", value: "Física" },
            { label: "Geografia", value: "Geografia" },
            { label: "História", value: "História" },
            { label: "História - 2ª Licenciatura", value: "História - 2ª Licenciatura" },
            { label: "Letras - Língua Inglesa - 2ª Licenciatura", value: "Letras - Língua Inglesa - 2ª Licenciatura" },
            { label: "Letras - Língua Portuguesa", value: "Letras - Língua Portuguesa" },
            { label: "Licenciatura Plena para Professores Indígenas do Alto Solimões", value: "Licenciatura Plena para Professores Indígenas do Alto Solimões" },
            { label: "Licenciatura em Computação", value: "Licenciatura em Computação" },
            { label: "Matemática", value: "Matemática" },
            { label: "Música - Canto", value: "Música - Canto" },
            { label: "Música - Educação Musical", value: "Música - Educação Musical" },
            { label: "Música - Instrumento", value: "Música - Instrumento" },
            { label: "Música - Regência", value: "Música - Regência" },
            { label: "Normal Superior", value: "Normal Superior" },
            { label: "PEDAGOGIA DO CAMPO", value: "PEDAGOGIA DO CAMPO" },
            { label: "Pedagogia", value: "Pedagogia" },
            { label: "Pedagogia - Licenciatura Intercultural Indígena", value: "Pedagogia - Licenciatura Intercultural Indígena" },
            { label: "Química", value: "Química" },
            { label: "Teatro", value: "Teatro" },
            { label: "Administração", value: "Administração" },
            { label: "Arqueologia", value: "Arqueologia" },
            { label: "Ciências Contábeis", value: "Ciências Contábeis" },
            { label: "Ciências Econômicas", value: "Ciências Econômicas" },
            { label: "Ciências Militares e Segurança Pública", value: "Ciências Militares e Segurança Pública" },
            { label: "Dança", value: "Dança" },
            { label: "Direito", value: "Direito" },
            { label: "Educação Física", value: "Educação Física" },
            { label: "Enfermagem", value: "Enfermagem" },
            { label: "Engenharia Civil", value: "Engenharia Civil" },
            { label: "Engenharia Eletrônica", value: "Engenharia Eletrônica" },
            { label: "Engenharia Elétrica", value: "Engenharia Elétrica" },
            { label: "Engenharia Florestal", value: "Engenharia Florestal" },
            { label: "Engenharia Mecatrônica", value: "Engenharia Mecatrônica" },
            { label: "Engenharia Mecânica", value: "Engenharia Mecânica" },
            { label: "Engenharia Naval", value: "Engenharia Naval" },
            { label: "Engenharia Química", value: "Engenharia Química" },
            { label: "Engenharia de Computação", value: "Engenharia de Computação" },
            { label: "Engenharia de Controle e Automação", value: "Engenharia de Controle e Automação" },
            { label: "Engenharia de Materiais", value: "Engenharia de Materiais" },
            { label: "Engenharia de Produção", value: "Engenharia de Produção" },
            { label: "Farmácia", value: "Farmácia" },
            { label: "Medicina", value: "Medicina" },
            { label: "Meteorologia", value: "Meteorologia" },
            { label: "Música - Canto", value: "Música - Canto" },
            { label: "Música - Instrumento", value: "Música - Instrumento" },
            { label: "Música - Regência", value: "Música - Regência" },
            { label: "Música Popular - Instrumento", value: "Música Popular - Instrumento" },
            { label: "Odontologia", value: "Odontologia" },
            { label: "Saúde Coletiva", value: "Saúde Coletiva" },
            { label: "Segurança Pública e do Cidadão", value: "Segurança Pública e do Cidadão" },
            { label: "Sistemas de Informação", value: "Sistemas de Informação" },
            { label: "Teatro", value: "Teatro" },
            { label: "Turismo", value: "Turismo" },
            { label: "Agroecologia", value: "Agroecologia" },
            { label: "Alimentos", value: "Alimentos" },
            { label: "Curso Superior em Biotecnologia", value: "Curso Superior em Biotecnologia" },
            { label: "Gestão Ambiental", value: "Gestão Ambiental" },
            { label: "Gestão Comercial", value: "Gestão Comercial" },
            { label: "Gestão Pública", value: "Gestão Pública" },
            { label: "Jogos Digitais", value: "Jogos Digitais" },
            { label: "Logística", value: "Logística" },
            { label: "MINERAÇÃO", value: "MINERAÇÃO" },
            { label: "Petróleo e Gás", value: "Petróleo e Gás" },
            { label: "Produção Audiovisual", value: "Produção Audiovisual" },
            { label: "Produção Pesqueira", value: "Produção Pesqueira" },
            { label: "Tecnologia Eletrotécnica", value: "Tecnologia Eletrotécnica" },
            { label: "Tecnologia da Madeira", value: "Tecnologia da Madeira" },
            { label: "Tecnologia em Agrimensura", value: "Tecnologia em Agrimensura" },
            { label: "Tecnologia em Análise e Desenvolvimento de Sistemas", value: "Tecnologia em Análise e Desenvolvimento de Sistemas" },
            { label: "Tecnologia em Automação Industrial", value: "Tecnologia em Automação Industrial" },
            { label: "Tecnologia em Biotecnologia", value: "Tecnologia em Biotecnologia" },
            { label: "Tecnologia em Construção Naval", value: "Tecnologia em Construção Naval" },
            { label: "Tecnologia em Eletrônica", value: "Tecnologia em Eletrônica" },
            { label: "Tecnologia em Gestão de Turismo", value: "Tecnologia em Gestão de Turismo" },
            { label: "Tecnologia em Manutenção Mecânica", value: "Tecnologia em Manutenção Mecânica" },
            { label: "Tecnologia em Processamento de Dados", value: "Tecnologia em Processamento de Dados" },
            { label: "Tecnologia em Saneamento Ambiental", value: "Tecnologia em Saneamento Ambiental" },
            { label: "Tecnologia em Turismo Ecológico", value: "Tecnologia em Turismo Ecológico" },
        ],
        'Macro': [
            { label: "Ciências Biológicas", value: "Ciências Biológicas" },
            { label: "Ciências da Religião - 1ª Licenciatura", value: "Ciências da Religião - 1ª Licenciatura" },
            { label: "Dança", value: "Dança" },
            { label: "Educação Física", value: "Educação Física" },
            { label: "Física", value: "Física" },
            { label: "Geografia", value: "Geografia" },
            { label: "História", value: "História" },
            { label: "História - 2ª Licenciatura", value: "História - 2ª Licenciatura" },
            { label: "Letras - Língua Inglesa - 2ª Licenciatura", value: "Letras - Língua Inglesa - 2ª Licenciatura" },
            { label: "Letras - Língua Portuguesa", value: "Letras - Língua Portuguesa" },
            { label: "Licenciatura Plena para Professores Indígenas do Alto Solimões", value: "Licenciatura Plena para Professores Indígenas do Alto Solimões" },
            { label: "Licenciatura em Computação", value: "Licenciatura em Computação" },
            { label: "Matemática", value: "Matemática" },
            { label: "Música - Canto", value: "Música - Canto" },
            { label: "Música - Educação Musical", value: "Música - Educação Musical" },
            { label: "Música - Instrumento", value: "Música - Instrumento" },
            { label: "Música - Regência", value: "Música - Regência" },
            { label: "Normal Superior", value: "Normal Superior" },
            { label: "PEDAGOGIA DO CAMPO", value: "PEDAGOGIA DO CAMPO" },
            { label: "Pedagogia", value: "Pedagogia" },
            { label: "Pedagogia - Licenciatura Intercultural Indígena", value: "Pedagogia - Licenciatura Intercultural Indígena" },
            { label: "Química", value: "Química" },
            { label: "Teatro", value: "Teatro" },
            { label: "Administração", value: "Administração" },
            { label: "Arqueologia", value: "Arqueologia" },
            { label: "Ciências Contábeis", value: "Ciências Contábeis" },
            { label: "Ciências Econômicas", value: "Ciências Econômicas" },
            { label: "Ciências Militares e Segurança Pública", value: "Ciências Militares e Segurança Pública" },
            { label: "Dança", value: "Dança" },
            { label: "Direito", value: "Direito" },
            { label: "Educação Física", value: "Educação Física" },
            { label: "Enfermagem", value: "Enfermagem" },
            { label: "Engenharia Civil", value: "Engenharia Civil" },
            { label: "Engenharia Eletrônica", value: "Engenharia Eletrônica" },
            { label: "Engenharia Elétrica", value: "Engenharia Elétrica" },
            { label: "Engenharia Florestal", value: "Engenharia Florestal" },
            { label: "Engenharia Mecatrônica", value: "Engenharia Mecatrônica" },
            { label: "Engenharia Mecânica", value: "Engenharia Mecânica" },
            { label: "Engenharia Naval", value: "Engenharia Naval" },
            { label: "Engenharia Química", value: "Engenharia Química" },
            { label: "Engenharia de Computação", value: "Engenharia de Computação" },
            { label: "Engenharia de Controle e Automação", value: "Engenharia de Controle e Automação" },
            { label: "Engenharia de Materiais", value: "Engenharia de Materiais" },
            { label: "Engenharia de Produção", value: "Engenharia de Produção" },
            { label: "Farmácia", value: "Farmácia" },
            { label: "Medicina", value: "Medicina" },
            { label: "Meteorologia", value: "Meteorologia" },
            { label: "Música - Canto", value: "Música - Canto" },
            { label: "Música - Instrumento", value: "Música - Instrumento" },
            { label: "Música - Regência", value: "Música - Regência" },
            { label: "Música Popular - Instrumento", value: "Música Popular - Instrumento" },
            { label: "Odontologia", value: "Odontologia" },
            { label: "Saúde Coletiva", value: "Saúde Coletiva" },
            { label: "Segurança Pública e do Cidadão", value: "Segurança Pública e do Cidadão" },
            { label: "Sistemas de Informação", value: "Sistemas de Informação" },
            { label: "Teatro", value: "Teatro" },
            { label: "Turismo", value: "Turismo" },
            { label: "Agroecologia", value: "Agroecologia" },
            { label: "Alimentos", value: "Alimentos" },
            { label: "Curso Superior em Biotecnologia", value: "Curso Superior em Biotecnologia" },
            { label: "Gestão Ambiental", value: "Gestão Ambiental" },
            { label: "Gestão Comercial", value: "Gestão Comercial" },
            { label: "Gestão Pública", value: "Gestão Pública" },
            { label: "Jogos Digitais", value: "Jogos Digitais" },
            { label: "Logística", value: "Logística" },
            { label: "MINERAÇÃO", value: "MINERAÇÃO" },
            { label: "Petróleo e Gás", value: "Petróleo e Gás" },
            { label: "Produção Audiovisual", value: "Produção Audiovisual" },
            { label: "Produção Pesqueira", value: "Produção Pesqueira" },
            { label: "Tecnologia Eletrotécnica", value: "Tecnologia Eletrotécnica" },
            { label: "Tecnologia da Madeira", value: "Tecnologia da Madeira" },
            { label: "Tecnologia em Agrimensura", value: "Tecnologia em Agrimensura" },
            { label: "Tecnologia em Análise e Desenvolvimento de Sistemas", value: "Tecnologia em Análise e Desenvolvimento de Sistemas" },
            { label: "Tecnologia em Automação Industrial", value: "Tecnologia em Automação Industrial" },
            { label: "Tecnologia em Biotecnologia", value: "Tecnologia em Biotecnologia" },
            { label: "Tecnologia em Construção Naval", value: "Tecnologia em Construção Naval" },
            { label: "Tecnologia em Eletrônica", value: "Tecnologia em Eletrônica" },
            { label: "Tecnologia em Gestão de Turismo", value: "Tecnologia em Gestão de Turismo" },
            { label: "Tecnologia em Manutenção Mecânica", value: "Tecnologia em Manutenção Mecânica" },
            { label: "Tecnologia em Processamento de Dados", value: "Tecnologia em Processamento de Dados" },
            { label: "Tecnologia em Saneamento Ambiental", value: "Tecnologia em Saneamento Ambiental" },
            { label: "Tecnologia em Turismo Ecológico", value: "Tecnologia em Turismo Ecológico" },
        ],
    };
    const modalidadesPorVestibular = {
        'PSC': [
            { label: "Ampla Concorrência (AC)", value: "AC" },
            { label: "Estudantes de Escola Pública (PP1)", value: "PP1" },
            { label: "Indígenas (IND1)", value: "IND1" },
            { label: "Quilombolas (QLB1)", value: "QLB1" },
            { label: "PCD (PCD1)", value: "PCD1" },
            { label: "NDC1", value: "NDC1" },
            { label: "Estudantes de Escola Pública (PP2)", value: "PP2" },
            { label: "Indígenas (IND2)", value: "IND2" },
            { label: "Quilombolas (QLB2)", value: "QLB2" },
            { label: "PCD (PCD2)", value: "PCD2" },
            { label: "NDC2", value: "NDC2" }
        ],
        'SIS': [
            { label: "Grupo A", value: "Grupo A" },
            { label: "Grupo B", value: "Grupo B" },
            { label: "Grupo C", value: "Grupo C" },
            { label: "Grupo D", value: "Grupo D" },
            { label: "Grupo E", value: "Grupo E" },
            { label: "Grupo F", value: "Grupo F" },
            { label: "Grupo G", value: "Grupo G" },
            { label: "Grupo H", value: "Grupo H" },
            { label: "Grupo I", value: "Grupo I" },
            { label: "Grupo J", value: "Grupo J" },
            { label: "Grupo K", value: "Grupo K" }
        ],
        'Macro': [
            { label: "Grupo 1", value: "Grupo 1" },
            { label: "Grupo 2", value: "Grupo 2" },
            { label: "Grupo 3", value: "Grupo 3" },
            { label: "Grupo 4", value: "Grupo 4" },
            { label: "Grupo 5", value: "Grupo 5" },
            { label: "Grupo 6", value: "Grupo 6" },
            { label: "Grupo 7", value: "Grupo 7" },
            { label: "Grupo 8", value: "Grupo 8" },
            { label: "Grupo 9", value: "Grupo 9" },
            { label: "Grupo 10", value: "Grupo 10" },
            { label: "Grupo 11", value: "Grupo 11" },
            { label: "Grupo 12", value: "Grupo 12" },
            { label: "Grupo Suplementar", value: "Grupo Suplementar" },
        ]
    };

    function populateSelects(data, selectElement) {
        selectElement.innerHTML = '<option value="">Selecione...</option>';
        if (data) {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.value;
                option.textContent = item.label;
                selectElement.appendChild(option);
            });
        }
    }

    // Listener para mostrar/esconder campos e popular as listas
    vestibularSelect.addEventListener('change', function() {
        const vestibular = vestibularSelect.value;
        // Esconde todos os campos primeiro
        pscFields.style.display = 'none';
        sisFields.style.display = 'none';
        macroFields.style.display = 'none';

        // Reseta as listas suspensas
        cursoSelect.innerHTML = '<option value="">Selecione...</option>';
        modalidadeSelect.innerHTML = '<option value="">Selecione...</option>';

        // Mostra os campos e preenche as listas relevantes
        if (vestibular === 'PSC') {
            pscFields.style.display = 'block';
            populateSelects(cursosPorVestibular.PSC, cursoSelect);
            populateSelects(modalidadesPorVestibular.PSC, modalidadeSelect);
        } else if (vestibular === 'SIS') {
            sisFields.style.display = 'block';
            populateSelects(cursosPorVestibular.SIS, cursoSelect);
            populateSelects(modalidadesPorVestibular.SIS, modalidadeSelect);
        } else if (vestibular === 'Macro') {
            macroFields.style.display = 'block';
            populateSelects(cursosPorVestibular.Macro, cursoSelect);
            populateSelects(modalidadesPorVestibular.Macro, modalidadeSelect);
        }
    });

    // Listener para submissão do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Coleta os dados básicos do formulário a partir das listas suspensas
        const vestibular = vestibularSelect.value;
        const curso = cursoSelect.value;
        const modalidade = modalidadeSelect.value;

        // Objeto para enviar os dados para o Flask
        let dados = {
            vestibular: vestibular,
            curso: curso,
            modalidade: modalidade
        };

        // Adiciona os dados específicos de cada vestibular
        if (vestibular === 'PSC') {
            dados.acertos_psc1 = document.getElementById('acertos_psc1').value || '0';
            dados.acertos_psc2 = document.getElementById('acertos_psc2').value || '0';
            dados.nota_redacao_psc = document.getElementById('nota_redacao_psc').value || '0.0';
        } else if (vestibular === 'SIS') {
            dados.acertos_sis1 = document.getElementById('acertos_sis1').value || '0';
            dados.acertos_sis2_obj = document.getElementById('acertos_sis2_obj').value || '0';
            dados.nota_red_sis2 = document.getElementById('nota_red_sis2').value || '0.0';
        } else if (vestibular === 'Macro') {
            dados.pontuacao_cg = document.getElementById('pontuacao_cg').value || '0.0';
            dados.pontuacao_ce = document.getElementById('pontuacao_ce').value || '0.0';
        }

        // Faz a chamada para o backend
        fetch('/simular_notas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor.');
            }
            return response.json();
        })
        .then(data => {
            resultadoDiv.textContent = data.mensagem;
            resultadoDiv.style.display = 'block';
        })
        .catch(error => {
            console.error('Erro:', error);
            resultadoDiv.textContent = 'Ocorreu um erro ao simular a nota. Por favor, tente novamente.';
            resultadoDiv.style.display = 'block';
        });
    });
});
