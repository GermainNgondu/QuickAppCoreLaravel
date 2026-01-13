<?php
namespace App\Core\Framework\UI\Table;

use App\Core\Framework\Contracts\Component;


class Table extends Component
{
    protected string $type = 'data_table';

    public function title(string $title): self { $this->meta['title'] = $title; return $this; }
    public function columns(array $columns): self { $this->meta['columns'] = $columns; return $this; }
    public function filters(array $filters): self { $this->meta['filters'] = $filters; return $this; }
    public function actions(array $actions): self { $this->meta['actions'] = $actions; return $this; }
    public function bulkActions(array $actions): self { $this->meta['bulkActions'] = $actions; return $this; }

    // NOUVEAU : Configuration du mode d'affichage
    public function defaultView(string $view): self { $this->meta['defaultView'] = $view; return $this; } // 'table' ou 'grid'
    public function enableViewSwitcher(bool $enable = true): self { $this->meta['showSwitcher'] = $enable; return $this; }

    // Mapping pour le mode Grille (quelles colonnes servent de titre, image, etc.)
    public function gridMapping(array $mapping): self { $this->meta['gridMapping'] = $mapping; return $this; }

    public function headerActions(array $actions): self { 
        $this->meta['headerActions'] = $actions; 
        return $this; 
    }
}